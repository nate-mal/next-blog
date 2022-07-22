import classes from "./notification.module.css";

function Notification(props) {
  const { title, message, status } = props;
  console.log(props);

  let statusClasses = "test";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
