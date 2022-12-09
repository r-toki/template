import { Box, Divider, Link, Stack } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getAuth, signOut as signOutFn } from 'firebase/auth';

import { AppLayout } from '@/components/AppLayout';
import { useAppToast } from '@/hooks/useAppToast';
import { deleteMe as deleteMeFn } from '@/lib/backend';

export const Settings = () => {
  const client = useQueryClient();
  const toast = useAppToast();

  const signOut = useMutation({
    mutationFn: () => signOutFn(getAuth()),
    onSuccess: () => {
      client.setQueryData(['me'], null);
      toast({ status: 'success', title: 'Signed out.' });
    },
  });
  const deleteMe = useMutation({
    mutationFn: async () => {
      await deleteMeFn();
      await signOutFn(getAuth());
    },
    onSuccess: () => {
      client.setQueryData(['me'], null);
      toast({ status: 'success', title: 'Deleted your account.' });
    },
  });

  const onDeleteMe = async () => {
    if (window.confirm('Delete your account?'))
      if (window.confirm('Are you cool with that?')) await deleteMe.mutate();
  };

  return (
    <AppLayout back="/home">
      <Stack spacing="4" align="start" p="4">
        <Box fontSize="xl">Account</Box>
        <Divider />
        <Link onClick={() => signOut.mutate()}>Sign out</Link>
        <Link color="red.500" onClick={onDeleteMe}>
          Delete your account
        </Link>
      </Stack>
    </AppLayout>
  );
};
