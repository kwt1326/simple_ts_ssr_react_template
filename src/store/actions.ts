import * as ACTION from './actionTypes';

/* action creators */
export const setOpenFeaturesMenu = (props: ACTION.menuActionProps) => {
  const { isOpen } = props;
  return { type: ACTION.PERSONAL_FEATURES, isOpen, }
}
