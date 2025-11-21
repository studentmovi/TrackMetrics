import axios from "axios";

const getToken = () => localStorage.getItem("token");
const getAuthHeaders = () => {
    const token = getToken();
    if (!token) throw new Error("No token found");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const ApiRequestRepo = {
    getProjects: () => axios.get("/api/projects",getAuthHeaders()),
    getProjectById: (id: string) => axios.get(`/api/projects/${id}`, getAuthHeaders()),
    addApiProject: (formData: FormData) =>
        axios.post("/api/projects", formData,getAuthHeaders()),
    updateProject: (id: string, updates: any) =>
        axios.put(`/api/projects/${id}`, updates, getAuthHeaders()),
    AuthUser: (username: string, password: string) =>
        axios.post("/api/users/login", { login: username, password }),
    getGithubOrgs: (token) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        }
        return axios.get("/api/github/orgs", config)
    },
    getProjectByLink: (link: string | Array<string>) =>
        axios.get(`/api/projects/by-link/${link}`),
    createGitHubRepo: (code: string | Array<string> | undefined, students: { name: string; github: string }[]) => {
        return axios.post("/api/github/create-repo", { code, students });
    },
    deleteProject: (id: string) =>
        axios.delete(`/api/projects/${id}`, getAuthHeaders()),
};