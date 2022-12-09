import {
  Box,
  Container,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { GoThreeBars } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

import { useMe } from '@/providers/me';

export const AppLayout = ({
  title = 'Template',
  back,
  children,
}: {
  title?: string;
  back?: string;
  children: ReactNode;
}) => {
  const navigate = useNavigate();
  const { me } = useMe();

  return (
    <Container maxW="md" py="2">
      <Stack spacing="4">
        <Flex justify="end" align="center" position="relative" h="40px">
          {back && (
            <Flex
              justify="center"
              align="center"
              position="absolute"
              left="0"
              w="10"
              h="10"
              cursor="pointer"
              onClick={() => navigate(back)}
            >
              <Icon as={FaArrowLeft} />
            </Flex>
          )}

          <Box
            position="absolute"
            left="50%"
            transform="translateX(-50%)"
            fontWeight="bold"
            fontSize="xl"
          >
            {title}
          </Box>

          <Box>
            <Menu placement="bottom-end">
              <MenuButton as={IconButton} icon={<GoThreeBars />} />
              <MenuList>
                <MenuItem fontWeight="bold">{me!.name}</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>

        <Box>{children}</Box>
      </Stack>
    </Container>
  );
};
