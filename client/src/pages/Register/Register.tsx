import {Link} from 'react-router-dom';

import {Button, Card, Form, FormProps, Input} from 'antd';

import paths from 'routes/paths';

import styles from './Register.module.scss';

type FieldType = {
  username?: string;
  password?: string;
  email?: string;
};

function Register() {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.container}>
      <Card
        title="Register"
        className={styles.card}
        classNames={{
          header: styles.header,
          body: styles.body,
        }}
        bordered={false}
      >
        <Form
          name="basic"
          initialValues={{remember: true}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType> name="username" rules={[{required: true, message: 'Please input your username!'}]}>
            <Input placeholder="username" />
          </Form.Item>

          <Form.Item<FieldType>
            name="email"
            rules={[
              {required: true, message: 'Please input your email!'},
              {type: 'email', message: "Please include an '@' in the email address"},
            ]}
          >
            <Input type="email" placeholder="email" />
          </Form.Item>

          <Form.Item<FieldType> name="password" rules={[{required: true, message: 'Please input your password!'}]}>
            <Input.Password placeholder="password" />
          </Form.Item>

          <Form.Item>
            <Button size="large" className={styles.submitButton} type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>

          <Form.Item className={styles.registerButton}>
            <p>Do you have an account?</p>
            <Link to={paths.login({}).$}>Login</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
