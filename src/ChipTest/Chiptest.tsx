import {
  Avatar,
  Chip,
  ChipsSelect,
  CustomSelectOption,
  FormItem,
} from "@vkontakte/vkui";
import { useChiptestModel } from "./hook";

export const Chiptest = () => {
  const { users, userInfo, loading, handleEnterUser, clearUser } =
    useChiptestModel();

  const handleChange = (
    items: { label: string; value: string; avatar: string }[]
  ) => {
    const value = items.at(-1)?.value;
    if (value) {
      return handleEnterUser(value);
    }
    clearUser();
  };

  return (
    <FormItem
      htmlFor="users"
      top="Выберите юзера"
      bottom="Возможные значения nlo, kiroti, cat"
    >
      <ChipsSelect
        multiple={false}
        creatable
        name="users"
        disabled={loading}
        fetching={loading}
        placeholder="Не выбраны"
        onChange={handleChange}
        value={
          userInfo
            ? [
                {
                  label: `${userInfo.name} (${userInfo.screenName})`,
                  value: userInfo.screenName,
                  avatar: userInfo.avatar,
                },
              ]
            : []
        }
        options={users.map((userInfo) => ({
          label: `${userInfo.name} (${userInfo.screenName})`,
          value: userInfo.screenName,
          avatar: userInfo.avatar,
        }))}
        renderChip={({ value, label, ...rest }, { avatar }) => (
          <Chip
            value={value}
            before={<Avatar size={20} src={avatar} aria-hidden />}
            {...rest}
          >
            {label}
          </Chip>
        )}
        renderOption={(props, { avatar }) => (
          <CustomSelectOption
            before={<Avatar size={20} aria-hidden src={avatar} />}
            {...props}
          />
        )}
      />
    </FormItem>
  );
};
