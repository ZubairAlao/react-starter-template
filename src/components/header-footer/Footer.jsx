const Footer = () => {

  const today = new Date();
  const thisYear = today.getFullYear();


  return (
    <footer className="relative overflow-hidden py-6 text-black text-center bg-slate-200">
     &copy;{thisYear}
    </footer>
  );
};

export default Footer;
