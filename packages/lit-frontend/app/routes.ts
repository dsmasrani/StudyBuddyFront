import "./views/home-view"
import "./views/addkey-view"
import "./views/upload-view"
import "./views/profile-view"
import "./views/about-view"
import "./views/chat-view"
export default [
  {
    path: "/chat",
    component: "chat-view"
  },
  {
    path: "/about",
    component: "about-view"
  },
  {
    path: "/add-keys",
    component: "addkey-view"
  },
  {
    path: "/upload",
    component: "upload-view"
  },
  {
    path: "/",
    component: "home-view"
  },
  {
    path: "/profile",
    component: "profile-view"
  },
  { path: "(.*)", redirect: "/" }
];