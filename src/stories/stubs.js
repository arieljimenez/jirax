export const defaultCardInfo = {
  title: 'New Card Tile',
  description: 'Optional Description',
  tags: [{ key: 1, label: 'storybook' }, { key: 2, label: 'Demo' }],
  assignee: 'Ariel Jiménez',
  dueDate: new Date().toISOString().substring(0, 16),
};