import { HistoryRounded, HomeRounded, Menu } from '@mui/icons-material';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Typography,
} from '@mui/joy';
import { FC, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer open={isOpen} size="sm" onClose={onClose}>
      <SidebarHeader />
      <List sx={{ p: 2 }}>
        <SidebarItem
          text="Inicio"
          icon={<HomeRounded />}
          link="/"
          onClose={onClose}
        ></SidebarItem>
        <SidebarItem
          text="Historico"
          icon={<HistoryRounded />}
          link="/history"
          onClose={onClose}
        ></SidebarItem>
      </List>
    </Drawer>
  );
};

const SidebarHeader: FC = () => (
  <Box p={2}>
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
      }}
    >
      <IconButton variant="soft" color="primary" size="md">
        <Menu />
      </IconButton>
      <Typography level="h3">Menu</Typography>
    </Box>
  </Box>
);

const SidebarItem: FC<{
  text: string;
  icon: ReactNode;
  link: string;
  onClose: () => void;
}> = ({ text, icon, link, onClose }) => (
  <ListItem
    sx={{ my: 0.5, '--ListItem-radius': (theme) => theme.vars.radius.sm }}
  >
    <ListItemButton
      sx={{ gap: 2 }}
      selected={useLocation().pathname === link}
      onClick={onClose}
    >
      {icon}
      <ListItemContent>
        <Link to={link} style={{ textDecoration: 'none' }}>
          <Typography level="title-lg">{text}</Typography>
        </Link>
      </ListItemContent>
    </ListItemButton>
  </ListItem>
);
