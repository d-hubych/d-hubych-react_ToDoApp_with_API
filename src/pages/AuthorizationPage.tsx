import React, {
  FC,
  useState,
  FormEvent,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from 'react';
import cn from 'classnames';
import { client } from '../utils/fetchClient';
import { User } from '../types/User';
import { minInputLength } from '../utils/contsnts';

type Props = {
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const AuthorizationPage: FC<Props> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isUserNotFound, setIsUserNotFound] = useState<boolean>(false);
  const [errAuthorization, setErrAuthorization] = useState<boolean>(false);
  const [isDisabledInput, setIsDisabledInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleReceivedUser = (receivedUser: User) => {
    const user = {
      id: receivedUser.id,
      email: receivedUser.email,
      name: receivedUser.name,
    };

    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const postNewUser = async () => {
    try {
      const result = await client.post<User>('/users', { email, name });

      handleReceivedUser(result);
    } catch {
      setErrAuthorization(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onAuthorizationSubmit = (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    if (email.length < minInputLength) {
      return;
    }

    setIsLoading(true);

    if (isUserNotFound) {
      if (name.length < minInputLength) {
        setIsLoading(false);

        return;
      }

      postNewUser();
    } else {
      const getUser = async () => {
        try {
          const result = await client.get<User[]>(`/users?email=${email}`);

          const user = result[0];

          if (user) {
            handleReceivedUser(user);
          } else {
            setIsUserNotFound(true);
            setIsDisabledInput(true);
          }
        } catch {
          setErrAuthorization(true);
        } finally {
          setIsLoading(false);
        }
      };

      getUser();
    }
  };

  return (
    <div className="todoapp authorization">
      <div className="todoapp__content authorization__content">
        Please, login to get yours todos

        <form
          method="post"
          onSubmit={(e) => onAuthorizationSubmit(e)}
          className="authorization__form"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailInput}
            className={cn(
              'input is-primary',
              'authorization__input',
            )}
            disabled={isDisabledInput}
            minLength={minInputLength}
          />

          {isUserNotFound && (
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              minLength={minInputLength}
              className={cn(
                'input is-primary',
                'authorization__input',
              )}
            />
          )}

          <button
            type="submit"
            className={cn(
              'button',
              'is-primary',
              { 'is-loading': isLoading },
            )}
          >
            confirm
          </button>
        </form>

        {errAuthorization && (
          <p className="authorization__error">
            Something went wrong with the authorization.
          </p>
        )}
      </div>
    </div>
  );
};
