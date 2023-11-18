import { EyeOutlined, InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Image, Space, Upload, message } from 'antd';
import { useState } from 'react';

const { Dragger } = Upload;

export default function UploadPage() {
  const [images, setImages] = useState<string[]>([]);

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: '',
    onChange(info) {
      const { fileList, file } = info;
      const { status } = file;

      if (status !== 'uploading') {
        const fileImages = fileList.map((file) =>
          URL.createObjectURL(file.originFileObj as Blob),
        );

        setImages(fileImages);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const MaskPreviewContent = () => (
    <>
      <EyeOutlined style={{ marginRight: 5 }} /> Preview
    </>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 100,
        overflow: 'hidden',
      }}
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>

      <Space size={50} style={{ zIndex: 1 }}>
        {images &&
          images.map((image) => (
            <Image
              key={image}
              width={200}
              style={{ borderRadius: 5 }}
              src={image}
              preview={{ mask: <MaskPreviewContent /> }}
            />
          ))}
      </Space>

      {images.length > 0 && (
        <Button type="primary" shape="round">
          Generate Links
        </Button>
      )}
    </div>
  );
}
