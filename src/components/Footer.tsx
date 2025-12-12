

function Footer() {
  const date = new Date().getFullYear(); ;
  return (

    <footer className="bg-stone-900 py-2 flex items-center justify-center w-full">
      <p className="text-white text-sm font-semibold"> © {date} Allbirds, Inc. All Rights Reserved</p>
    </footer>
  )
}

export default Footer