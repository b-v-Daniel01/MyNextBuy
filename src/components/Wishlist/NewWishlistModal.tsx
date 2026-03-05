import { Button, Group, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Wishlist } from '@/dexie/models/Wishlist';
import { WishlistService } from '@/services/implementations/WishlistServiceImpl';

export function NewWishlistModal({ onSuccess }) {
  const form = useForm<Wishlist>({
    initialValues: {
      name: '',
      description: '',
    },

    validate: {
      name: (value) => (value.length < 3 ? 'Il nome deve avere almeno 3 caratteri' : null),
      description: (value) =>
        value.length > 500 ? 'Descrizione troppo lunga, rimani sotto i 500 caratteri' : null,
    },
  });

  const handleSubmit = async (values: Wishlist) => {
    await WishlistService.save(values);
    console.log('saved');
    onSuccess();
  };

  return (
    <>
      <Title order={3}>Crea una nuova wishlist</Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Nome"
          placeholder="Acquisti personali"
          withAsterisk
          {...form.getInputProps('name')}
        />

        <TextInput
          label="Descrizione"
          placeholder="Lista di acquisti da fare senza urgenza"
          withAsterisk
          {...form.getInputProps('description')}
        />

        <Button type="submit" color="blue">
          Salva Wishlist
        </Button>
      </form>
    </>
  );
}
