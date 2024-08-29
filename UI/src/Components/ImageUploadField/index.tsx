import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, UploadFile } from "antd";
import CustomField from "../CustomField";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_URL } from "../../hooks/useApi";
import axios from "axios";

const ImageUploadField = (props: { defaultImages?: [] }) => {
  const form = useFormInstance();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>(
    props.defaultImages
      ? (props.defaultImages.map((x, index) => ({
          // uid: `-${index}`, // Ensure each file has a unique `uid`
          // name: `image-${index}.png`, // Generate a unique name for each image
          // status: "done", // Assuming these images are already uploaded
          url: x,
        })) as unknown as UploadFile[])
      : []
  );

  const handlePreview = async (file: UploadFile) => {
    setPreviewImage(file.url ?? "");
    setPreviewOpen(true);
  };

  const handleChange = ({ file, fileList }: any) => {
    if (file.status === "done") {
      file.url = file.response.secure_url;
    }
    setFileList(fileList);
    console.log("fileList", fileList);
    form.setFieldValue(
      "image",
      fileList.map((x: any) => x.url)
    );
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <CustomField
        label="Upload Images"
        name="image"
        span={{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24 }}
      >
        <Upload
          customRequest={(options) => {
            const formData = new FormData();
            formData.append("file", options.file);
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

            axios
              .post(CLOUDINARY_URL, formData)
              .then((res) => {
                setFileList([...fileList, res.data.secure_url]);
                options.onSuccess?.(res.data, res.data.secure_url);
              })
              .catch((err) => console.error(err));
          }}
          // onRemove={(file) => {
          //   console.log(file);
          // }}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={(data) => {
            handleChange(data);
          }}
          progress={{
            strokeColor: {
              "0%": "#108ee9",
              "100%": "#87d068",
            },
            strokeWidth: 3,
            format: (percent) =>
              percent && `${parseFloat(percent.toFixed(2))}%`,
          }}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
      </CustomField>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ImageUploadField;
