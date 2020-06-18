import React, { useState } from "react";
import { Modal, Button, Icon, ModalContent, Popup } from "semantic-ui-react";

const Modalredirect = (props) => {
  const [open, setOpen] = useState(false);

  const { OnConfirm, text, title, button, disabled, modal } = props;

  const handleopen = () => {
    setOpen(true);
  };
  const handleclose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleclose}
      className="_redirect_modal"
      trigger={
        <>
          {modal ? (
            <Button
              disabled={disabled}
              onClick={handleopen}
              animated
              color={button.color}
              className={
                modal
                  ? button.color === "blue"
                    ? "_primary _hidden_on_mobile shadow"
                    : "_hidden_on_mobile shadow"
                  : "_hide_on_mobile shadow"
              }
            >
              <Button.Content visible content={button.text} />
              <Button.Content hidden>
                <Icon name={button.icon} />
              </Button.Content>
            </Button>
          ) : (
            <Popup
              content={button.text}
              trigger={
                <Button
                  onClick={handleopen}
                  icon={{ name: button.icon }}
                  color={button.color}
                  className="_hide_on_mobile"
                />
              }
            />
          )}
          <Button
            onClick={handleopen}
            color={button.color}
            content={!modal && button.text}
            icon={modal && { name: button.icon }}
            className={
              modal
                ? button.color === "blue"
                  ? "shadow _mobile_btn _primary"
                  : "shadow _mobile_btn"
                : "shadow _hide_on_desktop"
            }
          />
        </>
      }
    >
      <ModalContent>
        <ModalContent className="details_content">
          <div className="_header_modal extra-text text-default">
            <p>{title}</p>
          </div>
          <div className="_redirection_content">
            <p>{text}</p>
          </div>
        </ModalContent>
        <ModalContent className="content_modal_btns">
          <Button
            animated
            color="blue"
            className="_primary"
            onClick={OnConfirm}
          >
            <Button.Content visible content="Confirmer" />
            <Button.Content hidden>
              <Icon name="checkmark" />
            </Button.Content>
          </Button>
          <Button animated onClick={handleclose} color="orange">
            <Button.Content visible content="Annuler" />
            <Button.Content hidden>
              <Icon name="delete" />
            </Button.Content>
          </Button>
        </ModalContent>
      </ModalContent>
    </Modal>
  );
};

export default Modalredirect;
