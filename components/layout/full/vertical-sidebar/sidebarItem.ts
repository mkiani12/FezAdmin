import {
  LayoutDashboardIcon,
  FormsIcon,
  PaperclipIcon,
} from "vue-tabler-icons";

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: "Home"},
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/",
  },
  { header: "Demo" },
  {
    title: "Requests",
    icon: PaperclipIcon,
    to: "/demo",
  },
  {
    title: "Add User",
    icon: PaperclipIcon,
    to: "/demo/add",
  },
  { header: "Emails" },
  {
    title: "Recent Mails",
    icon: FormsIcon,
    to: "/email",
  },
  {
    title: "Send Mail",
    icon: FormsIcon,
    to: "/email/send",
  },
];

export default sidebarItem;
