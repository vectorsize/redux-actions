# redux-tools

This is a (WIP) collection of redux utilities based on [redux-actions](https://github.com/redux-utilities/redux-actions).  
This utilities propose proper component modularisation and state management separation of concerns enforcing the original redux patterns.
While some of the core ideas remain the same, some changes have been added to allow the following features.

* Adding unique identifiers to action names to avoid action collisions.
* Enforces proper action/reducer matching.
* Makes action/reducer binding easily "automateable".
* Helps keeping reducers pure and easily testable.
* Keeps readable action name for Redux developer tools compatibility.


## Notes

⚠️ At the moment some of the APIs are not stable and the original tests are failing, wthis will be fixed in future releases,
however the library has been successfully used in several production projects.

⚠️ The files containing original code or sections of the original react-actions code contain the original copyright.