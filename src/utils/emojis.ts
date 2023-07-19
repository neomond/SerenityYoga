export const emojis = ['🤯', '🥵', '😌', '😪', '😡'];

export const getEmojiForCategory = (categoryName: string) => {
  switch (categoryName) {
    case 'Stress':
      return '🤯';
    case 'Anxiety':
      return '🥵';
    case 'Depression':
      return '😪';
    case 'Anger':
      return '😡';
    case 'Calmness':
      return '😌';
    default:
      return '❓';
  }
};
