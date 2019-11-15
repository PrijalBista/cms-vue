import Dashboard from "./components/dashboard/Dashboard";
import Blogs from "./components/blogs/Blogs";
import CreateBlog from "./components/blogs/CreateBlog";
import UpdateBlog from "./components/blogs/UpdateBlog";
import Feeds from "./components/feeds/Feeds";
import CreateFeed from "./components/feeds/CreateFeed";
import UpdateFeed from "./components/feeds/UpdateFeed";
import Gallery from "./components/gallery/Gallery";
import CreateGallery from "./components/gallery/CreateGallery";
import UpdateGallery from "./components/gallery/UpdateGallery";
import Vacancy from "./components/vacancy/Vacancy";
import CreateVacancy from "./components/vacancy/CreateVacancy";
import UpdateVacancy from "./components/vacancy/UpdateVacancy";
import Carousel from "./components/carousel/Carousel";
import CreateCarousel from "./components/carousel/CreateCarousel";
import UpdateCarousel from "./components/carousel/UpdateCarousel";
import Cover from "./components/cover/Cover";
import UpdateCover from "./components/cover/UpdateCover";
import Project from "./components/projects/Project";
import CreateProject from "./components/projects/CreateProject";
import UpdateProject from "./components/projects/UpdateProject";
import Account from "./components/account/Account";

export const routes = [
  {
    path: "/",
    component: Dashboard
  },
  // BLOG
  {
    path: "/blogs",
    component: Blogs
  },
  {
    path: "/blogs/new",
    component: CreateBlog
  },
  {
    path: "/blogs/:id/edit",
    component: UpdateBlog
  },
  // FEEDS
  {
    path: "/feeds",
    component: Feeds
  },
  {
    path: "/feeds/new",
    component: CreateFeed
  },
  {
    path: "/feeds/:id/edit",
    component: UpdateFeed
  },
  //GALLERY
  {
    path: "/gallery",
    component: Gallery
  },
  {
    path: "/gallery/new",
    component: CreateGallery
  },
  {
    path: "/gallery/:id/edit",
    component: UpdateGallery
  },
  //VACANCY
  {
    path: "/vacancy",
    component: Vacancy
  },
  {
    path: "/vacancy/new",
    component: CreateVacancy
  },
  {
    path: "/vacancy/:id/edit",
    component: UpdateVacancy
  },
  //CAROUSEL
  {
    path: "/carousel",
    component: Carousel
  },
  {
    path: "/carousel/new",
    component: CreateCarousel
  },
  {
    path: "/carousel/:id/edit",
    component: UpdateCarousel
  },
  //COVER
  {
    path: "/covers",
    component: Cover
  },
  {
    path: "/covers/:id/edit",
    component: UpdateCover
  },
  //COVER
  {
    path: "/projects",
    component: Project
  },
  {
    path: "/projects/new",
    component: CreateProject
  },
  {
    path: "/projects/:id/edit",
    component: UpdateProject
  },
  //ACCOUNT
  {
    path: "/account",
    component: Account
  }
];
