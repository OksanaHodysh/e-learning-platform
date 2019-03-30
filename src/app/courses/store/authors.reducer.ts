import { Author } from '../models/author.model';
import { AuthorsAction, AuthorsActionsEnum } from './authors.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface AuthorsState extends EntityState<Author> {
  authorsLoaded: boolean;
}

export const adapter: EntityAdapter<Author> = createEntityAdapter<Author>();

export const initialState: AuthorsState = adapter.getInitialState({
  authorsLoaded: false
});

export function authorsReducer(
  state = initialState,
  action: AuthorsAction
): AuthorsState {
  switch (action.type) {

    case AuthorsActionsEnum.LoadAuthorsSuccess: {
      return adapter.addAll(
        action.authors,
        {...state, authorsLoaded: true}
      );
    }

    default: {
      return state;
    }
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
