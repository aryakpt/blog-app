import {Button, Empty} from 'antd';
import {NavigateOptions, useNavigate} from 'react-router-dom';

import styles from './EmptyNotFound.module.scss';

const EmptyNotFound = () => {
  const navigate = useNavigate() as (to: number | string, options?: NavigateOptions) => void;

  const handleRedirectPrevious = () => navigate(-1, {replace: true});

  return (
    <div className={styles.container}>
      <Empty>
        <div className={styles.content}>
          <p>Yikess!!! The page you visited does not exist.</p>
          <Button onClick={handleRedirectPrevious}>Go Back</Button>
        </div>
      </Empty>
    </div>
  );
};

export default EmptyNotFound;
