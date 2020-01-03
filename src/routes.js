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

import UpdateAccount from "./components/account/UpdateAccount";
import CreateAccount from "./components/account/CreateAccount";
import Accounts from "./components/account/Accounts";

import Jobs from "./components/jobs/Jobs";
import CreateJob from "./components/jobs/CreateJob";
import UpdateJob from "./components/jobs/UpdateJob";

import Feedbacks from "./components/feedbacks/Feedbacks";
import CreateFeedback from "./components/feedbacks/CreateFeedback";
import UpdateFeedback from "./components/feedbacks/UpdateFeedback";

import Share from "./components/shares/Share.vue";
import CreateShare from "./components/shares/CreateShare.vue";
import UpdateShare from "./components/shares/UpdateShare.vue";

import Emails from "./components/emails/Emails.vue";

export const routes = [
  {
    path: "/",
    component: Dashboard
  },
  // BLOG
  // {
  //   path: "/blogs",
  //   component: Blogs
  // },
  // {
  //   path: "/blogs/new",
  //   component: CreateBlog
  // },
  // {
  //   path: "/blogs/:id/edit",
  //   component: UpdateBlog,
  //   props: true
  // },
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
    component: UpdateFeed,
    props: true
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
    component: UpdateGallery,
    props: true
  },
  //VACANCY
  // {
  //   path: "/vacancies",
  //   component: Vacancy
  // },
  // {
  //   path: "/vacancies/new",
  //   component: CreateVacancy
  // },
  // {
  //   path: "/vacancies/:id/edit",
  //   component: UpdateVacancy,
  //   props: true
  // },
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
    component: UpdateCarousel,
    props: true
  },
  //COVER
  {
    path: "/covers",
    component: Cover
  },
  {
    path: "/covers/:id/edit",
    component: UpdateCover,
    props: true
  },
  //PROJECT
  // {
  //   path: "/projects",
  //   component: Project
  // },
  // {
  //   path: "/projects/new",
  //   component: CreateProject
  // },
  // {
  //   path: "/projects/:id/edit",
  //   component: UpdateProject,
  //   props: true
  // },
  //JOBS
  {
    path: "/jobs",
    component: Jobs
  },
  {
    path: "/jobs/new",
    component: CreateJob
  },
  {
    path: "/jobs/:id/edit",
    component: UpdateJob,
    props: true
  },

  //FEEDBACKS
  {
    path: "/feedbacks",
    component: Feedbacks
  },
  {
    path: "/feedbacks/new",
    component: CreateFeedback
  },
  {
    path: "/feedbacks/:id/edit",
    component: UpdateFeedback,
    props: true
  },
  //ACCOUNT
  // {
  //   path: "/accounts",
  //   component: Accounts
  // },
  // {
  //   path: "/accounts/new",
  //   component: CreateAccount
  // },
  // {
  //   path: "/accounts/update",
  //   component: UpdateAccount
  // },
  //SHARE
  {
    path: "/shares",
    component: Share
  },
  {
    path: "/shares/new",
    component: CreateShare
  },
  {
    path: "/shares/:id/edit",
    component: UpdateShare,
    props: true
  },
  {
    path: "/emails",
    component: Emails
  },
  //DEFAULT
  {
    path: "*",
    redirect: "/"
  }
];
