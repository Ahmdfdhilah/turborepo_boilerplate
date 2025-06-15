// src/services/userService.ts
import api from "@/utils/api";
import { useToast } from "@workspace/ui/components/sonner";

export interface RoleResponse {
    role_id: number;
    role_type: string;
    role_description?: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserResponse {
    user_id: number;
    user_email: string;
    user_first_name: string;
    user_last_name?: string;
    user_is_active: boolean;
    user_sso_id?: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserWithRolesResponse extends UserResponse {
    roles: RoleResponse[];
}

export interface CreateUserData {
    user_email: string;
    user_first_name: string;
    user_last_name?: string;
    user_is_active?: boolean;
    user_sso_id?: string;
}

export interface UpdateUserData {
    user_first_name?: string;
    user_last_name?: string;
    user_is_active?: boolean;
    user_sso_id?: string;
}

export interface UserRoleCreate {
    role_id: number;
}

export interface StatusMessage {
    status: string;
    message: string;
}

const { toast } = useToast();

export const userService = {
    // User management
    getUsers: async (
        skip: number = 0,
        limit: number = 100,
        search?: string,
        isActive?: boolean
    ): Promise<UserResponse[]> => {
        try {
            const response = await api.get("/users/", {
                params: { skip, limit, search, is_active: isActive }
            });
            return response.data;
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.detail || "Failed to fetch users",
                variant: "destructive",
            });
            throw error;
        }
    },

    createUser: async (userData: CreateUserData): Promise<UserResponse> => {
        try {
            const response = await api.post("/users/", userData);
            toast({
                title: "Success",
                description: "User created successfully",
            });
            return response.data;
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.detail || "Failed to create user",
                variant: "destructive",
            });
            throw error;
        }
    },

    getCurrentUser: async (): Promise<UserResponse> => {
        try {
            const response = await api.get("/users/me");
            return response.data;
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.detail || "Failed to fetch current user",
                variant: "destructive",
            });
            throw error;
        }
    },

    getCurrentUserRoles: async (): Promise<UserWithRolesResponse> => {
        try {
            const response = await api.get("/users/me/roles");
            return response.data;
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.detail || "Failed to fetch user roles",
                variant: "destructive",
            });
            throw error;
        }
    },

    getAllRoles: async (): Promise<RoleResponse[]> => {
        try {
            const response = await api.get("/users/roles");
            return response.data;
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.detail || "Failed to fetch roles",
                variant: "destructive",
            });
            throw error;
        }
    },

    getUserById: async (userId: number): Promise<UserResponse> => {
        try {
            const response = await api.get(`/users/${userId}`);
            return response.data;
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.detail || "Failed to fetch user",
                variant: "destructive",
            });
            throw error;
        }
    },

    updateUser: async (userId: number, userData: UpdateUserData): Promise<UserResponse> => {
        try {
            const response = await api.put(`/users/${userId}`, userData);
            toast({
                title: "Success",
                description: "User updated successfully",
            });
            return response.data;
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.detail || "Failed to update user",
                variant: "destructive",
            });
            throw error;
        }
    },

    deleteUser: async (userId: number): Promise<StatusMessage> => {
        try {
            const response = await api.delete(`/users/${userId}`);
            toast({
                title: "Success",
                description: "User deleted successfully",
            });
            return response.data;
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.detail || "Failed to delete user",
                variant: "destructive",
            });
            throw error;
        }
    },

    getUserWithRoles: async (userId: number): Promise<UserWithRolesResponse> => {
        try {
            const response = await api.get(`/users/${userId}/roles`);
            return response.data;
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.detail || "Failed to fetch user with roles",
                variant: "destructive",
            });
            throw error;
        }
    },

    addRoleToUser: async (userId: number, roleData: UserRoleCreate): Promise<UserWithRolesResponse> => {
        try {
            const response = await api.post(`/users/${userId}/roles`, roleData);
            toast({
                title: "Success",
                description: "Role added to user successfully",
            });
            return response.data;
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.detail || "Failed to add role to user",
                variant: "destructive",
            });
            throw error;
        }
    },

    removeRoleFromUser: async (userId: number, roleId: number): Promise<UserWithRolesResponse> => {
        try {
            const response = await api.delete(`/users/${userId}/roles/${roleId}`);
            toast({
                title: "Success",
                description: "Role removed from user successfully",
            });
            return response.data;
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.response?.data?.detail || "Failed to remove role from user",
                variant: "destructive",
            });
            throw error;
        }
    }
};

export default userService;