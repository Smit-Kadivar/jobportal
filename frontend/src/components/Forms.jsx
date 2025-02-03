import React from 'react';
import axios from 'axios';
import '../App.css';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Checkbox, Upload, message } from 'antd';

const Forms = () => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log('Form values:', values);
  
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('contactnumber', values.contactNumber);
    formData.append('noticeperiod', values.noticePeriod);
    formData.append('joblocation', values.jobLocation);
    formData.append('currentorganization', values.currentOrganization);
    formData.append('currentCTC', values.currentCTC);
    formData.append('expectedCTC', values.expectedCTC);
    formData.append('experienceYearsandMonths', values.experience);
    
    if (values.cv && values.cv[0]) {
      formData.append('uploadCV', values.cv[0].originFileObj);
    }
  
    try {
      const response = await axios.post('https://job-portal-md6f.onrender.com/api/form', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      message.success('Form submitted successfully!');
      console.log('Form response: ', response.data);
    } catch (error) {
      message.error(`Submission failed: ${error.response?.data?.message || 'Unknown error'}`);
      console.error('There was an error!', error);
    }
    document.getElementById("formsubmit").reset();
  };
  

  const onFinishFailed = (errorInfo) => {
    message.error('Please fill all the required fields!');
    console.log('Failed:', errorInfo);
  };

  const validateEmail = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please enter your email!'));
    }
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)) {
      return Promise.reject(new Error('Invalid email address!'));
    }
    return Promise.resolve();
  };

  const validateContactNumber = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please enter your contact number!'));
    }
    if (!/^\d{10}$/.test(value)) {
      return Promise.reject(new Error('Contact number must be 10 digits!'));
    }
    return Promise.resolve();
  };

  return (
    <div className="bg-[#f3f9f9] flex flex-col lg:mx-40 lg:m-20 p-10 shadow-xl">
      <div className="text-left">
        <div className="text-[50px] font-bold">
          <h1>Application Form</h1>
        </div>
        <div className="text-[30px] text-[#2e8096] mt-2 mb-3">
          <h3>Software Developer</h3>
        </div>
        <div>
          <p>Please complete the form below to apply for a position with us.</p>
        </div>
      </div>
      <hr className="mt-4 border-[#2e8096]"></hr>

      <div>
        <Form
          id= "formsubmit"
          form={form}
          className="mt-8"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div className="flex flex-col lg:flex-row justify-center text-sm lg:text-[300px] gap-4 lg:gap-10">
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please enter your name!' }]}
              className="text-[#2e8096]"
            >
              <Input size="large" className="w-full lg:w-96 placeholder-[#2e8096]" placeholder="Name" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ validator: validateEmail }]}
            >
              <Input size="large" className="w-full lg:w-96 placeholder-[#2e8096]" placeholder="Email" />
            </Form.Item>
          </div>

          <div className="flex flex-col lg:flex-row justify-center text-sm lg:text-[300px] gap-4 lg:gap-10">
            <Form.Item
              name="contactNumber"
              rules={[{ validator: validateContactNumber }]}
              className="text-[#2e8096]"
            >
              <Input size="large" className="w-full lg:w-96 placeholder-[#2e8096]" placeholder="Contact Number" />
            </Form.Item>
            <Form.Item
              name="noticePeriod"
              rules={[{ required: true, message: 'Please enter your notice period!' }]}
            >
              <Input size="large" className="w-full lg:w-96 placeholder-[#2e8096]" placeholder="Notice Period (Months)" />
            </Form.Item>
          </div>

          <div className="flex flex-col lg:flex-row justify-center text-sm lg:text-[300px] gap-4 lg:gap-10">
            <Form.Item
              name="jobLocation"
              rules={[{ required: true, message: 'Please enter your job location!' }]}
              className="text-[#2e8096]"
            >
              <Input size="large" className="w-full lg:w-96 placeholder-[#2e8096]" placeholder="Job Location" />
            </Form.Item>
            <Form.Item
              name="currentOrganization"
              rules={[{ required: true, message: 'Please enter your current organization!' }]}
            >
              <Input size="large" className="w-full lg:w-96 placeholder-[#2e8096]" placeholder="Current Organization" />
            </Form.Item>
          </div>

          <div className="flex flex-col lg:flex-row justify-center text-sm lg:text-[300px] gap-4 lg:gap-10">
            <Form.Item
              name="currentCTC"
              rules={[{ required: true, message: 'Please enter your current CTC!' }]}
              className="text-[#2e8096]"
            >
              <Input size="large" className="w-full lg:w-96 placeholder-[#2e8096]" placeholder="Current CTC(LPA)" />
            </Form.Item>
            <Form.Item
              name="expectedCTC"
              rules={[{ required: true, message: 'Please enter your expected CTC!' }]}
            >
              <Input size="large" className="w-full lg:w-96 placeholder-[#2e8096]" placeholder="Expected CTC(LPA)" />
            </Form.Item>
          </div>

          <div className="flex flex-col justify-center text-sm  lg:pl-[150px] lg:text-[300px] gap-4 lg:gap-10">
            <Form.Item
              name="experience"
              rules={[{ required: true, message: 'Please enter your experience!' }]}
              className="text-[#2e8096]"
            >
              <Input size="large" className="w-full lg:w-[700px] placeholder-[#2e8096]" placeholder="Experience Years and Months" />
            </Form.Item>
          </div>

          <div className="flex justify-center text-sm lg:text-[300px]">
            <Form.Item
              name="cv"
              valuePropName="fileList"
              rules={[{ required: true, message: 'Please upload your CV!' }]}
              getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
            >
              <Upload className="placeholder-[#2e8096] mb-3 text-center">
                <Button className="w-full lg:w-96 text-[#2e8096] mb-3 text-center" icon={<UploadOutlined />}>
                  Upload CV
                </Button>
              </Upload>
            </Form.Item> 

          </div>

          <div className="mb-4 flex justify-center">
            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject(new Error('Should accept terms and conditions')) }]}
            >
              <Checkbox>I have read & agreed to the terms & conditions.*</Checkbox>
            </Form.Item>
          </div>

          <div className="flex justify-center">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full lg:w-[400px] bg-[#2e8096] hover:bg-[#3cb6b6]"
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Forms;
