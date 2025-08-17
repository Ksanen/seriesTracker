export default function handleError(e: any): string {
  let error = '';
  switch (e.status) {
    case 404:
      error = 'not found';
      break;
    case 500:
      error = 'Internal server error';
      break;
    case 503:
      error = 'database error';
      break;
  }
  return error;
}
