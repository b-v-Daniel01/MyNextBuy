import { useCallback, useEffect, useState } from 'react';
import { IconEdit, IconNewSection, IconTrashOff } from '@tabler/icons-react';
import {
  ActionIcon,
  Card,
  Group,
  Modal,
  Pagination,
  Select,
  Skeleton,
  Stack,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NewWishlistModal } from '@/components/Wishlist/NewWishlistModal';
import { useWishlist } from '@/contexts/DataContextProvider';
import { Wishlist } from '@/models/Wishlist';

export function Wishlists() {
  const [loading, setLoading] = useState(true);

  const { wishlistService } = useWishlist();

  //PAGER
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState('20');
  const [totalPages, setTotalPages] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selected, setSelected] = useState();
  const [modalOpened, { open, close }] = useDisclosure(false);

  //wlsts
  const [listWl, setListWl] = useState<Wishlist[]>([]);

  //aggiornamento lista wishlist
  // Caricamento iniziale e al cambio pagina/limite

  const handleClose = async () => {
    close();
    await refreshWishlist();
  };

  const refreshWishlist = useCallback(async () => {
    setLoading(true);

    try {
      const options = {
        limit: parseInt(itemsPerPage, 10),
        page: activePage,
      };

      const data = await wishlistService.findAll(options);
      const totalItems = await wishlistService.countAll();

      setListWl(data);
      setTotalPages(Math.ceil(totalItems / parseInt(itemsPerPage, 10)));
    } catch (error) {
      console.error('Errore nel caricamento:', error);
      setListWl([]);
    } finally {
      setLoading(false);
    }
  }, [activePage, itemsPerPage, wishlistService]);

  useEffect(() => {
    refreshWishlist();
  }, [refreshWishlist]);

  const skeletons = Array.from({ length: 5 }).map((_, i) => (
    <Skeleton key={i} height={100} w={700} radius="md">
      <Card title="skel">aa</Card>
    </Skeleton>
  ));

  const noWl = <div>Nessuna Wishlist Trovata!</div>;

  const renderCards = listWl.map((wl) => (
    <Card key={wl.id} shadow="sm" padding="lg" radius="md" withBorder>
      <Title order={3} size="h4">
        {wl.name}
      </Title>
      {/* Aggiungi qui altri dettagli della wishlist */}
    </Card>
  ));

  return (
    <Stack
      align="center"
      justify="space-between"
      style={{ minHeight: 'calc(100vh - 60px - 60px - var(--mantine-spacing-md) * 2)' }}
    >
      {/* bottoni */}
      <div>
        <Title order={1}>WishLists</Title>
        <Group justify="center" gap="xs" grow>
          <ActionIcon
            variant="filled"
            size="lg"
            radius="xs"
            aria-label="Create New"
            disabled={loading || modalOpened}
            onClick={open}
          >
            <IconNewSection style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            color="yellow"
            variant="filled"
            size="lg"
            radius="xs"
            aria-label="Edit"
            disabled={loading || !selected}
          >
            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            color="red"
            variant="filled"
            size="lg"
            radius="xs"
            aria-label="Delete"
            disabled={loading || !selected}
          >
            <IconTrashOff style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>

      {/* placeholder della lista delle wishlist */}
      {loading && skeletons}

      {!loading && listWl.length > 0 && renderCards}

      {!loading && listWl.length === 0 && noWl}

      <Modal opened={modalOpened} onClose={handleClose} title="Authentication" centered>
        <NewWishlistModal onSuccess={handleClose} />
      </Modal>

      {/* pagging */}
      <Group justify="center" gap="md">
        <Tooltip
          label="numero di elementi per pagina"
          color="gray"
          position="left"
          offset={24}
          arrowOffset={10}
          arrowSize={8}
          withArrow
        >
          <Select
            value={itemsPerPage}
            onChange={(value) => value && setItemsPerPage(value)}
            data={['10', '20', '30', '50', '100', '200']}
            allowDeselect={false}
            size="sm"
            w={70}
          />
        </Tooltip>

        <Pagination total={totalPages} value={activePage} onChange={setActivePage} withEdges />
      </Group>
    </Stack>
  );
}
