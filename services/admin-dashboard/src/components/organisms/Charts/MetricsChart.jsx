import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { Card, Select, Space, Button, Typography } from 'antd';
import { ReloadOutlined, FullscreenOutlined } from '@ant-design/icons';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5radar from '@amcharts/amcharts5/radar';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import styled from 'styled-components';

const { Title } = Typography;
const { Option } = Select;

const ChartContainer = styled.div`
  width: 100%;
  height: ${props => props.height || '400px'};
  background: #ffffff;
  border-radius: 8px;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e8e8e8;
`;

const ChartTitle = styled(Title)`
  && {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
  }
`;

const ChartControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ChartBody = styled.div`
  padding: 20px;
  height: calc(100% - 72px);
`;

const MetricsChart = ({
  title = "메트릭 차트",
  data = [],
  chartType = 'line',
  height = '400px',
  showControls = true,
  showRefresh = true,
  showFullscreen = false,
  timeRange = '1h',
  onRefresh,
  onTimeRangeChange,
  onFullscreen,
  xField = 'date',
  yField = 'value',
  categoryField = 'category',
  loading = false,
  ...props
}) => {
  const chartRef = useRef(null);
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    // Create root element
    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    let chart;

    switch (chartType) {
      case 'line':
        chart = createLineChart(root, data, xField, yField);
        break;
      case 'bar':
        chart = createBarChart(root, data, xField, yField);
        break;
      case 'area':
        chart = createAreaChart(root, data, xField, yField);
        break;
      case 'pie':
        chart = createPieChart(root, data, categoryField, yField);
        break;
      case 'donut':
        chart = createDonutChart(root, data, categoryField, yField);
        break;
      case 'radar':
        chart = createRadarChart(root, data, categoryField, yField);
        break;
      default:
        chart = createLineChart(root, data, xField, yField);
    }

    return () => {
      if (root) {
        root.dispose();
      }
    };
  }, [data, chartType, xField, yField, categoryField]);

  const createLineChart = (root, chartData, xField, yField) => {
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true
      })
    );

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxZoomCount: 50,
        baseInterval: { timeUnit: "minute", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "메트릭",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: yField,
        valueXField: xField,
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 2,
      stroke: am5.color("#1890ff")
    });

    series.fills.template.setAll({
      fillOpacity: 0.1,
      visible: true,
      fill: am5.color("#1890ff")
    });

    series.data.setAll(chartData);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      })
    );

    legend.data.setAll(chart.series.values);

    chart.appear(1000, 100);
    series.appear(1000);

    return chart;
  };

  const createBarChart = (root, chartData, xField, yField) => {
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none"
      })
    );

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: xField,
        renderer: am5xy.AxisRendererX.new(root, {})
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "메트릭",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: yField,
        categoryXField: xField,
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      })
    );

    series.columns.template.setAll({
      cornerRadiusTL: 3,
      cornerRadiusTR: 3,
      fill: am5.color("#1890ff")
    });

    xAxis.data.setAll(chartData);
    series.data.setAll(chartData);

    chart.appear(1000, 100);
    series.appear(1000);

    return chart;
  };

  const createAreaChart = (root, chartData, xField, yField) => {
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX"
      })
    );

    const cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));

    const xAxis = chart.xAxes.push(
      am5xy.DateAxis.new(root, {
        baseInterval: { timeUnit: "minute", count: 1 },
        renderer: am5xy.AxisRendererX.new(root, {})
      })
    );

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: "메트릭",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: yField,
        valueXField: xField,
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      })
    );

    series.fills.template.setAll({
      fillOpacity: 0.3,
      visible: true,
      fill: am5.color("#1890ff")
    });

    series.data.setAll(chartData);

    chart.appear(1000, 100);
    series.appear(1000);

    return chart;
  };

  const createPieChart = (root, chartData, categoryField, valueField) => {
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: valueField,
        categoryField: categoryField
      })
    );

    series.data.setAll(chartData);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 15,
        marginBottom: 15
      })
    );

    legend.data.setAll(series.dataItems);

    chart.appear(1000, 100);
    series.appear(1000);

    return chart;
  };

  const createDonutChart = (root, chartData, categoryField, valueField) => {
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50)
      })
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: valueField,
        categoryField: categoryField,
        innerRadius: am5.percent(50)
      })
    );

    series.data.setAll(chartData);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
        marginTop: 15,
        marginBottom: 15
      })
    );

    legend.data.setAll(series.dataItems);

    chart.appear(1000, 100);
    series.appear(1000);

    return chart;
  };

  const createRadarChart = (root, chartData, categoryField, valueField) => {
    const chart = root.container.children.push(
      am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none"
      })
    );

    const categoryAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: categoryField,
        renderer: am5radar.AxisRendererCircular.new(root, {})
      })
    );

    const valueAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5radar.AxisRendererRadial.new(root, {})
      })
    );

    const series = chart.series.push(
      am5radar.RadarLineSeries.new(root, {
        name: "메트릭",
        xAxis: categoryAxis,
        yAxis: valueAxis,
        valueYField: valueField,
        categoryXField: categoryField,
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      })
    );

    series.strokes.template.setAll({
      strokeWidth: 2,
      stroke: am5.color("#1890ff")
    });

    series.fills.template.setAll({
      fillOpacity: 0.1,
      visible: true,
      fill: am5.color("#1890ff")
    });

    categoryAxis.data.setAll(chartData);
    series.data.setAll(chartData);

    chart.appear(1000, 100);
    series.appear(1000);

    return chart;
  };

  const timeRangeOptions = [
    { label: '15분', value: '15m' },
    { label: '1시간', value: '1h' },
    { label: '6시간', value: '6h' },
    { label: '24시간', value: '24h' },
    { label: '7일', value: '7d' },
    { label: '30일', value: '30d' }
  ];

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    }
  };

  const handleTimeRangeChange = (value) => {
    if (onTimeRangeChange) {
      onTimeRangeChange(value);
    }
  };

  const handleFullscreen = () => {
    if (onFullscreen) {
      onFullscreen();
    }
  };

  return (
    <Card
      style={{ height }}
      styles={{ body: { padding: 0, height: '100%' } }}
      loading={loading}
      {...props}
    >
      {showControls && (
        <ChartHeader>
          <ChartTitle level={4}>{title}</ChartTitle>
          <ChartControls>
            <Select
              value={timeRange}
              onChange={handleTimeRangeChange}
              style={{ width: 80 }}
              size="small"
            >
              {timeRangeOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
            {showRefresh && (
              <Button
                type="text"
                size="small"
                icon={<ReloadOutlined />}
                onClick={handleRefresh}
              />
            )}
            {showFullscreen && (
              <Button
                type="text"
                size="small"
                icon={<FullscreenOutlined />}
                onClick={handleFullscreen}
              />
            )}
          </ChartControls>
        </ChartHeader>
      )}
      <ChartBody>
        <ChartContainer ref={chartRef} height={showControls ? 'calc(100% - 0px)' : '100%'} />
      </ChartBody>
    </Card>
  );
};

export default MetricsChart;