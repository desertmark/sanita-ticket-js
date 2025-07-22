import { History, HomeRounded } from '@mui/icons-material';
import { Avatar, Box, Drawer, List, ListItem, ListItemButton, ListItemContent, Stack, Typography } from '@mui/joy';
import { FC, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoSrc from '../../../assets/icon.png';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <Drawer open={isOpen} size="sm" onClose={onClose}>
      <SidebarHeader />
      <List sx={{ p: 2 }}>
        <SidebarItem text="Inicio" icon={<HomeRounded />} link="/" onClose={onClose} />
        <SidebarItem text="Historico" icon={<History />} link="/history" onClose={onClose} />
        <SidebarItem text="Inicio v2" icon={<HomeRounded />} link="/homev2" onClose={onClose} />
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
      <Stack direction="row" sx={{ ml: 1, mt: 3 }} gap={1.5}>
        <Avatar src={logoSrc} alt="Sanita Ticket Logo" size="sm" />
        <Typography level="h3" fontWeight="normal">
          Sanita Ticket
        </Typography>
      </Stack>
    </Box>
  </Box>
);

const SidebarItem: FC<{
  text: string;
  icon: ReactNode;
  link: string;
  onClose: () => void;
}> = ({ text, icon, link, onClose }) => (
  <ListItem sx={{ my: 0.5, '--ListItem-radius': (theme) => theme.vars.radius.sm }}>
    <ListItemButton sx={{ gap: 2 }} selected={useLocation().pathname === link} onClick={onClose}>
      {icon}
      <ListItemContent>
        <Link to={link} style={{ textDecoration: 'none' }}>
          <Typography level="title-lg">{text}</Typography>
        </Link>
      </ListItemContent>
    </ListItemButton>
  </ListItem>
);
