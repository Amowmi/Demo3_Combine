import * as React from 'react';
import { Switch } from 'react-native-paper';

import { useDispatch } from 'react-redux';
import {setDarkMode} from '../actions/Actions'
import { useSelector } from 'react-redux';

const ModeSwitch = () => {
  const dispatch = useDispatch();

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => {
    dispatch(setDarkMode(!isSwitchOn));
    setIsSwitchOn(!isSwitchOn);

  }
  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

export default ModeSwitch;