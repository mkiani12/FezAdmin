import DashboardIcon from "~icons/material-symbols/dashboard-outline-rounded";
import DemoRequestsIcon from "~icons/material-symbols/record-voice-over-outline-rounded";
import DemoAddUserIcon from "~icons/material-symbols/person-add-outline-rounded";
import RecentMailsIcon from "~icons/material-symbols/markunread-mailbox-outline-rounded";
import SendMailIcon from "~icons/material-symbols/gmail-add-on";

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
  size?: number;
}

const sidebarItem: menu[] = [
  { header: "Home" },
  {
    title: "Dashboard",
    icon: DashboardIcon,
    to: "/",
  },
  { header: "Demo" },
  {
    title: "Requests",
    icon: DemoRequestsIcon,
    to: "/demo",
  },
  {
    title: "Add User",
    icon: DemoAddUserIcon,
    to: "/demo/add",
  },
  { header: "Emails" },
  {
    title: "Recent Mails",
    icon: RecentMailsIcon,
    to: "/email",
  },
  {
    title: "Send Mail",
    icon: SendMailIcon,
    to: "/email/send",
  },
];

export default sidebarItem;
