import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { SecurityService } from '../services/SecurityService';

export const SettingsModal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSave = async (values: any) => {
    try {
      setLoading(true);
      await SecurityService.updateApiKeys({
        wellsFargoApiKey: values.wellsFargoApiKey,
        wellsFargoSecret: values.wellsFargoSecret
      });
      message.success('API keys updated successfully');
      onClose();
    } catch (error) {
      message.error('Failed to update API keys');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="API Settings"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Form form={form} onFinish={handleSave} layout="vertical">
        <Form.Item
          label="Wells Fargo API Key"
          name="wellsFargoApiKey"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Wells Fargo Secret"
          name="wellsFargoSecret"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save Settings
        </Button>
      </Form>
    </Modal>
  );
};
