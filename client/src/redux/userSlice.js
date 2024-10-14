import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 1,
  name: 'Sandip Maity',
  title: 'Software Engineer',
  img: "/team-member.png",
  location: 'Kolkata, WB, India',
  email: 'sandip@gmail.com',
  phone: '+91 7908729570',
  about: 'Passionate software engineer with 2+ years of experience in full-stack development.',
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
  experience: [
    { title: 'Senior Developer', company: 'Tech Co', period: '2020 - Present' },
    { title: 'Junior Developer', company: 'Startup Inc', period: '2018 - 2020' },
  ],
  education: [
    { degree: 'B.S. Computer Science', school: 'University of Technology', year: '2018' },
  ],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
