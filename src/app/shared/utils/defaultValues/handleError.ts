export default function handleError(e: any): void {
  switch (e.status) {
    case 400:
      console.log('Błąd walidacji');
      break;
    case 500:
      console.log('Internal server error');
      break;
    default:
      console.log('Inny błąd', e);
  }
}
