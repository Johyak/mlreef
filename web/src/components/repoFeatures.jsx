import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MDropdown from 'components/ui/MDropdown';
import {
  string,
  shape,
  number,
  func,
  arrayOf,
} from 'prop-types';

export class RepoFeatures extends Component {
  constructor(props) {
    super(props);
    const {
      branch,
      projectId,
    } = this.props;

    this.state = {
      isOpen: false,
      plusOpen: false,
      branchSelected: decodeURIComponent(branch),
      projectId,
      branches: [],
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    const newState = { ...prevState };
    newState.branches = nextProps.branches;

    newState.branchSelected = nextProps.branch !== prevState.branchSelected
      ? nextProps.branch
      : newState.branchSelected;

    return newState;
  }

  componentWillUnmount() {
    this.setState = (state) => (state);
  }

  render() {
    const {
      projectId,
      branches,
    } = this.state;

    const { branch, path } = this.props;

    return branch && (
      <div id="repo-features">

        <MDropdown
          className="mr-2 mt-3"
          label="Master"
          component={(
            <div id="branches-list" className="select-branch">
              <div
                style={{ margin: '0 50px', fontSize: '14px', padding: '0 40px' }}
              >
                <p>Switch Branches</p>
              </div>
              <hr />
              <div className="search-branch">
                <input
                  type="text"
                  placeholder="Search branches or tags"
                />
                <div className="branches">
                  <ul>
                    <li className="branch-header">Branches</li>
                    {branches && branches.filter((branch) => !branch.name.startsWith('data-pipeline/')
                      && !branch.name.startsWith('data-visualization/') && !branch.name.startsWith('experiment/')).map((branch) => {
                      const encoded = encodeURIComponent(branch.name);
                      return (
                        <li key={encoded}>
                          <Link
                            id={branch.name}
                            to={`/my-projects/${projectId}/${encoded}`}
                          >
                            <p>{branch.name}</p>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}
        />

        <MDropdown
          className="mr-2 mt-3"
          label={<i className="fa fa-plus" />}
          component={(
            <div className="plus-dropdown">
              <ul className="plus-list">
                <li>This directory</li>
                <hr />
                <li>This repository</li>
                <li className="plus-option">
                  <Link to={`/my-projects/${projectId}/new-branch`}>
                    New branch
                  </Link>
                </li>
              </ul>
            </div>
          )}
        />

        <Link
          className="btn btn-dark px-3 mr-2 mt-3"
          to={`/my-projects/${projectId}/empty-data-visualization`}
        >
          Data Visualisation
        </Link>

        <Link
          className="btn btn-dark px-3 mr-auto mt-3"
          to={`/my-projects/${projectId}/pipe-line`}
        >
          Data Pipeline
        </Link>

        <Link
          className="btn btn-outline-dark mt-3"
          to={`/my-projects/${projectId}/${branch}/commits/${path}`}
        >
          History
        </Link>
      </div>
    );
  }
}

RepoFeatures.propTypes = {
  branch: string.isRequired,
  path: string.isRequired,
  projectId: number.isRequired,
  updateLastCommit: func.isRequired,
  branches: arrayOf(
    shape({
      name: string.isRequired,
    }),
  ).isRequired,
};

function mapStateToProps(state) {
  return {
    projects: state.projects,
    branches: state.branches,
  };
}

export default connect(mapStateToProps)(RepoFeatures);
