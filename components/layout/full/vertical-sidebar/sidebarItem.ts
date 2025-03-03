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
    to: "/forms/list/documents",
  },
  { header: "Emails" },
  {
    title: "Send",
    icon: FormsIcon,
    to: "/forms",
  },
  {
    title: "Recent",
    icon: FormsIcon,
    to: "/forms",
  },
];

export default sidebarItem;
