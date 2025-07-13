import React, { useState, useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Button, Space, Input, Select, Tooltip } from 'antd';
import { SearchOutlined, ReloadOutlined, DownloadOutlined, SettingOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 400px;
  .ag-theme-alpine {
    --ag-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --ag-font-size: 14px;
    --ag-header-height: 48px;
    --ag-row-height: 40px;
    --ag-border-color: #e8e8e8;
    --ag-header-background-color: #fafafa;
    --ag-odd-row-background-color: #fafafa;
    --ag-row-hover-color: #f0f9ff;
  }
`;

const GridToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  margin-bottom: 16px;
  border-bottom: 1px solid #e8e8e8;
`;

const ToolbarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const QuickFilter = styled(Input)`
  width: 250px;
`;

const GridStats = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 8px;
`;

const AdvancedDataGrid = ({
  data = [],
  columns = [],
  loading = false,
  onSelectionChange,
  onRefresh,
  onExport,
  enableSelection = true,
  selectionMode = 'multiple',
  enableQuickFilter = true,
  enableExport = true,
  enableColumnManagement = true,
  pagination = true,
  paginationPageSize = 50,
  height = '600px',
  ...props
}) => {
  const [gridApi, setGridApi] = useState(null);
  const [columnApi, setColumnApi] = useState(null);
  const [quickFilterText, setQuickFilterText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true,
    floatingFilter: false,
    minWidth: 100,
  }), []);

  const gridOptions = useMemo(() => ({
    rowSelection: enableSelection ? selectionMode : null,
    suppressRowClickSelection: false,
    enableRangeSelection: true,
    animateRows: true,
    pagination: pagination,
    paginationPageSize: paginationPageSize,
    suppressPaginationPanel: false,
    suppressScrollOnNewData: true,
    getRowStyle: (params) => {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#fafafa' };
      }
    },
  }), [enableSelection, selectionMode, pagination, paginationPageSize]);

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
    params.api.sizeColumnsToFit();
  }, []);

  const onSelectionChanged = useCallback((event) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    setSelectedRows(selectedData);
    
    if (onSelectionChange) {
      onSelectionChange(selectedData);
    }
  }, [onSelectionChange]);

  const handleQuickFilter = useCallback((value) => {
    setQuickFilterText(value);
    if (gridApi) {
      gridApi.setQuickFilter(value);
    }
  }, [gridApi]);

  const handleRefresh = useCallback(() => {
    if (gridApi) {
      gridApi.refreshCells();
      gridApi.deselectAll();
    }
    if (onRefresh) {
      onRefresh();
    }
  }, [gridApi, onRefresh]);

  const handleExport = useCallback((format = 'csv') => {
    if (gridApi) {
      if (format === 'csv') {
        gridApi.exportDataAsCsv({
          fileName: `data_export_${new Date().getTime()}.csv`,
        });
      } else if (format === 'excel') {
        gridApi.exportDataAsExcel({
          fileName: `data_export_${new Date().getTime()}.xlsx`,
        });
      }
    }
    if (onExport) {
      onExport(format);
    }
  }, [gridApi, onExport]);

  const handleAutoSizeColumns = useCallback(() => {
    if (columnApi) {
      columnApi.autoSizeAllColumns();
    }
  }, [columnApi]);

  const handleResetColumns = useCallback(() => {
    if (columnApi) {
      columnApi.resetColumnState();
      gridApi.sizeColumnsToFit();
    }
  }, [columnApi, gridApi]);

  const exportOptions = [
    { label: 'CSV 내보내기', value: 'csv' },
    { label: 'Excel 내보내기', value: 'excel' },
  ];

  return (
    <div style={{ height }}>
      {(enableQuickFilter || enableExport || enableColumnManagement) && (
        <GridToolbar>
          <ToolbarSection>
            {enableQuickFilter && (
              <QuickFilter
                placeholder="빠른 검색..."
                prefix={<SearchOutlined />}
                value={quickFilterText}
                onChange={(e) => handleQuickFilter(e.target.value)}
                allowClear
              />
            )}
            <Button
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              disabled={loading}
            >
              새로고침
            </Button>
          </ToolbarSection>

          <ToolbarSection>
            {enableSelection && selectedRows.length > 0 && (
              <span style={{ color: '#1890ff', fontSize: '14px' }}>
                {selectedRows.length}개 선택됨
              </span>
            )}
            
            {enableColumnManagement && (
              <Space>
                <Tooltip title="컬럼 크기 자동 조정">
                  <Button
                    icon={<SettingOutlined />}
                    onClick={handleAutoSizeColumns}
                    size="small"
                  />
                </Tooltip>
                <Button onClick={handleResetColumns} size="small">
                  컬럼 초기화
                </Button>
              </Space>
            )}

            {enableExport && (
              <Select
                placeholder="내보내기"
                style={{ width: 120 }}
                onSelect={handleExport}
                suffixIcon={<DownloadOutlined />}
                options={exportOptions}
              />
            )}
          </ToolbarSection>
        </GridToolbar>
      )}

      <GridContainer>
        <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
          <AgGridReact
            rowData={data}
            columnDefs={columns}
            defaultColDef={defaultColDef}
            gridOptions={gridOptions}
            onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
            loading={loading}
            loadingOverlayComponent="로딩 중..."
            noRowsOverlayComponent="데이터가 없습니다"
            {...props}
          />
        </div>
      </GridContainer>

      {data.length > 0 && (
        <GridStats>
          총 {data.length}개의 레코드
          {enableSelection && selectedRows.length > 0 && (
            <span> • {selectedRows.length}개 선택됨</span>
          )}
        </GridStats>
      )}
    </div>
  );
};

export default AdvancedDataGrid;