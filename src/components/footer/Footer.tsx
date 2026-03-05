import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react';
import { ActionIcon, Anchor, Group, Image, Text } from '@mantine/core';

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Store' },
  { link: '#', label: 'Careers' },
];

export function FooterCentered() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div>
      <div>
        <Group justify="space-between" p={30} pb={10}>
          <Text>MyNextByt</Text>

          <Group>{items}</Group>

          <Group justify="flex-end" wrap="nowrap">
            <ActionIcon size="md" variant="default" radius="xl" aria-label="Twitter">
              <IconBrandTwitter size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="md" variant="default" radius="xl" aria-label="YouTube">
              <IconBrandYoutube size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="md" variant="default" radius="xl" aria-label="Instagram">
              <IconBrandInstagram size={18} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </div>
    </div>
  );
}
