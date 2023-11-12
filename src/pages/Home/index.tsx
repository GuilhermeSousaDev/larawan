import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { user } = useModel('auth');
  
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        { user && <Guide name={trim(user.name)} /> }
      </div>
    </PageContainer>
  );
};

export default HomePage;
