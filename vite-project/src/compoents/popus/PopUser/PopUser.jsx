export const PopUser = ({ onClose }) => {
    return (
      <div className="header__pop-user-set pop-user-set" id="user-set-target">
        <p className="pop-user-set__name">Ivan Ivanov</p>
        <p className="pop-user-set__mail">ivan.ivanov@gmail.com</p>
        <div className="pop-user-set__theme">
          <p>Темная тема</p>
          <input type="checkbox" className="checkbox" name="checkbox" />
        </div>
        <button type="button" className="_hover03" onClick={onClose}>
          Закрыть
        </button>
      </div>
    );
  };