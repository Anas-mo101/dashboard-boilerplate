export interface DashboardAdmin {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface PaginatedDashboardAdmin {
    count: number;
    hasMore: boolean;
    admins: DashboardAdmin[]
}