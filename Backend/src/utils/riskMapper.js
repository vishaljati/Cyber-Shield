export const mapRiskToAction = (risk) => {
  switch (risk) {
    case 'HIGH':
      return 'Block';

    case 'MEDIUM':
      return 'Ask User';

    case 'LOW':
      return 'Allow';

    default:
      return 'Ask User';
  }
};
