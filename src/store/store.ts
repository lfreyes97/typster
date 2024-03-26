import { createPinia, defineStore } from "pinia";
import { MaybeRef, reactive, ref, toValue, unref } from "vue";
import { IProject } from "../pages/project/interface";

const pinia = createPinia();
const EDITING_FILE = "EDITING_FILE";
const DEVICE_key = "ICAMERA_DEVICE_ID";
const PROJECTS_KEY = "PROJECTS_KEY";
const EDITING_PROJECT = "EDITING_PROJECT";

const useSystemStoreHook = defineStore("system", () => {
  const editingFilePath = ref(window.localStorage.getItem(EDITING_FILE) ?? "");
  const setEditingFilePath = (val: string) => {
    editingFilePath.value = val;
    window.localStorage.setItem(EDITING_FILE, val);
  };

  const dirs = reactive([]);

  const imgBedToken = ref<string>(
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibHgiLCJpZCI6MSwiaWF0IjoxNzA5ODg3MjUwLCJleHAiOjE3MTAwNjAwNTB9.oq5FJrAWN7HsNBqibFWY3ZPd0w6odM2W5j_Vr6UruwA"
  );
  const imgBedUrl = ref("http://127.0.0.1:8443/chunk/upload");
  const imgBedShowBaseUrl = ref("http://127.0.0.1:8443/chunk/show");

  const projects = reactive<IProject[]>(
    JSON.parse(window.localStorage.getItem(PROJECTS_KEY) ?? "[]")
  );
  const addProject = (p: IProject) => {
    projects.push(p);
    window.localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  };
  const deleteProject = (project: IProject) => {
    let index = projects.findIndex((item) => {
      return item.title == project.title;
    });
    projects.splice(index, 1);
    window.localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  };

  const editingProject = ref<IProject | null>(
    JSON.parse(window.localStorage.getItem(EDITING_PROJECT) ?? "null")
  );
  const selectProject = (pr: IProject) => {
    editingProject.value = pr;
    window.localStorage.setItem(EDITING_PROJECT, JSON.stringify(pr));
  };

  // 浏览和编辑
  const editView = ref(true);
  const preview = ref(true);

  const toggleEditView = () => {
    editView.value = !editView.value;
  };
  const togglePreview = () => {
    preview.value = !preview.value;
  };

  return {
    editView,
    toggleEditView,
    preview,
    togglePreview,

    editingProject,
    selectProject,
    projects,
    addProject,
    deleteProject,
    editingFilePath,
    setEditingFilePath,
    dirs,
    imgBedUrl,
    imgBedShowBaseUrl,
    imgBedToken,
  };
});

export { pinia, useSystemStoreHook };