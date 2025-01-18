import { Helmet, HelmetData } from 'react-helmet-async';

const helmetData = new HelmetData({});
export const Head = ({ title = '', description = '' }) => {
  return (
    <Helmet
      helmetData={helmetData}
      title={title ? `${title}` : undefined}
      defaultTitle="Experience Cleaning Excellence with MES | Your Total Facility Solution Experts"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};
