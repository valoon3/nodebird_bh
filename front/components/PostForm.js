import React, {useCallback, useRef, useState} from 'react';
import { Form, Input, Button } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {addPost} from "../reducers/post";

const dummy = {
  isLoggedIn: true,
  imagePaths: [],
  mainPosts: [{
    User: {
      id: 1,
      nickname: '제로초',
    },
    content: '첫 번째 게시글',
    img: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
  }],
};

const PostForm = () => {
    const {imagePaths} = useSelector((state) => state.post);
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, [])
    const onSubmit = useCallback(() => {
        dispatch(addPost);
        setText('');
    }, []);
    //=====================
  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
      <div>
        <input type="file" multiple hidden ref={imageInput} />  {/* ref 확인하자 */}
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">짹짹</Button>
      </div>
      <div>
        {dummy.imagePaths.map((v) => {
          return (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          )
        })}
      </div>
    </Form>
  );
};

export default PostForm;
