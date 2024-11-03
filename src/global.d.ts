export { };

declare global {
    interface Window {
        electron: {
            invoke(channel: string, ...args: any[]): Promise<any>;
        };
        api: {
            getAllEmployees: () => Promise<Employee[]>;
            addEmployee: (employee: { name: string; age: number; position: string }) => Promise<string>;
            deleteEmployeeById: (uuid: string) => Promise<void>;
        };
    }
}
