import Script from 'next/script'

export default function Footer() {
  return (
    <div>
      <footer className="py-5 bg-dark">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright &copy; My Blog 2022
          </p>
        </div>
      </footer>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" />
    </div>
  );
}
