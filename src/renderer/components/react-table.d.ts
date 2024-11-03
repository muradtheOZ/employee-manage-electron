// react-table.d.ts
declare module 'react-table' {
    import { ReactNode } from 'react';


    declare module 'react-table' {
        export interface Column<T extends object = {}> {
            Header: string;
            accessor: keyof T | ((row: T) => any);
            Cell?: (props: CellProps<T>) => ReactNode;
        }

        export interface CellProps<T extends object = {}> {
            cell: {
                value: any;
            };
            row: {
                original: T;
            };
        }

        export interface HeaderGroup<T extends object = {}> {
            headers: ColumnInstance<T>[];
            getHeaderGroupProps: () => any;
        }

        export interface Row<T extends object = {}> {
            index: number;
            cells: Cell<T>[];
            getRowProps: () => any;
        }


        export interface Cell<T extends object = {}> {
            getCellProps: () => any;
            render: (type: 'Cell' | 'Header') => ReactNode;
        }

        export interface ColumnInstance<T extends object = {}> extends Column<T> {
            getHeaderProps: () => any;
            render: (type: 'Header' | 'Cell') => ReactNode;
        }

        export interface TableOptions<T extends object = {}> {
            columns: Column<T>[];
            data: T[];
        }

        export function useTable<T extends object = {}>(
            options: TableOptions<T>
        ): {
            getTableProps: () => any;
            getTableBodyProps: () => any;
            headerGroups: HeaderGroup<T>[];
            rows: Row<T>[];
            prepareRow: (row: Row<T>) => void;
        };
    }

}
