import "./style.css";

export default function Google() {
  function Submit(e) {
    const formEle = document.querySelector("form");
    const formDatab = new FormData(formEle);
    fetch(
      "https://script.google.com/macros/s/AKfycbx9lzfZhPbVitVDqK7NvKQJ3IEj9fDkP1GAREUIIGKaxm6iv6rbq9Iaa33wL7GkoqCl/exec",
      {
        method: "POST",
        body: formDatab
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="App">
      <div>
        <form className="form" onSubmit={(e) => Submit(e)}>
          <input placeholder="Họ tên khách hàng" name="Name" type="text" />
          <input placeholder="Số điện thoại" name="Phone" type="text" />
          <input placeholder="Địa chỉ" name="Address" type="text" />
          <input name="Name" type="submit" />
        </form>
      </div>
    </div>
  );
}
