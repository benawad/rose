import React from 'react';
import { ListItem } from 'material-ui/List';

export default ({ suggestion: { text } }) => <ListItem primaryText={text} />;
