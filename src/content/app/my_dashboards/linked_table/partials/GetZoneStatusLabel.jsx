import Label from 'src/components/Label';

const GetZoneStatusLabel = ({ status }) => {
  // console.log('DEBUG status', status);
  const properties = {
    inactive: {
      text: 'Inactive',
      color: 'error'
    },
    connected: {
      text: 'connected',
      color: 'success'
    },
    alarm: {
      text: 'Alarm',
      color: 'warning'
    }
  };

  const { text, color } = properties[status];

  return <Label color={color}>{text}</Label>;
};

export default GetZoneStatusLabel;
