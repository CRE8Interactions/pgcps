// import { seedDev } from "../fakers/generators";
import allSchools from '../seeds/schools.json'

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ['plugin::users-permissions.user', 'api::access-request.access-request'],
      async afterCreate(event) {
        // afterCreate lifeclcyle
        const { result, params } = event;
        // listens for changes on user model
        if (event.model.singularName === 'user') {
          if (result.type === 'student') await strapi.service('api::utility.utility').sendMessage(result.email, 'donotreply@pgcps.org', `New account Creation for ${result.fullName}`, 'An account has been created on SPRY using this email address.  Please login to complete your profile if you havent already.')

          if (result.type === 'counselor') {
            result['school'] = params.data.school
            await strapi.service('api::utility.utility').createAccessRequest(result)
          }
        }
        // listens for changes on access-request model
        if (event.model.singularName === 'access-request') {
          await strapi.service('api::utility.utility').sendMessage('spry_admins@pgcps.org', 'donotreply@pgcps.org', `New Counselor access requested`, `${result.requestor.fullName} has requested ${result.requestor.type} access to join ${result.school.name} to approve click <a href=${process.env.CLIENT_HOST}/request?code=${result.code}>Here</a>`)
        }
      },
      async beforeCreate(event) {
        // beforeCreate lifeclcyle
        const { result, params } = event;
        // listens for changes on user model
        if (event.model.singularName === 'user') {
          const role = await strapi.db.query('plugin::users-permissions.role').findOne({
            where: {
              name: {
                $eqi: params.data.type
              }
            }
          })

          params.data.role = role
        }
         // listens for changes on access-request model
        if (event.model.singularName === 'access-request') {
          params.data.code = await strapi.service('api::utility.utility').generateAlphaNumeric()
        }

        
      },
    });

    if (process.env.NODE_ENV === "development") {
      // Creates student and counselor roles
      let counselorRole;
      let studentRole;

      const createRoles = async() => {
          const studentRolePresent = await strapi.db.query('plugin::users-permissions.role').findOne({
          where: {
            name: 'Student'
          },
        })

        const counselorRolePresent = await strapi.db.query('plugin::users-permissions.role').findOne({
          where: {
            name: 'Counselor'
          },
        })

        if (!studentRolePresent) {
          studentRole = await strapi.db.query('plugin::users-permissions.role').create({
            data: {
              name: 'Student',
              description: 'Default role given to Student'
            },
          })
        }

        if (!counselorRolePresent) {
          counselorRole = await strapi.db.query('plugin::users-permissions.role').create({
            data: {
              name: 'Counselor',
              description: 'Default role given to Counselor'
            },
          })
        }

        const findSchoolPermission = await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action: 'api::school.school.find'
          }
        })

        const mePermission = await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action: 'user.me'
          }
        })

        const registerPermission = await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action: 'auth.register'
          }
        })

        const createOrUpdateProfilePermission = await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action: 'api::profile.profile.addOrUpdateProfile'
          }
        })

        const findProfilePermission = await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action: 'api::profile.profile.find'
          }
        })

        const approveAccessRequestPermission = await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action: 'api::organization.organization.approveAccessRequest'
          }
        })

        const getAccessRequestPermission = await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action: 'api::organization.organization.getAccessRequest'
          }
        })

        const createSHLPermission = await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action: 'api::service-hour-log.service-hour-log.create'
          }
        })

        const findSHLPermission = await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action: 'api::service-hour-log.service-hour-log.find'
          }
        })

        const updateSHLPermission = await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action: 'api::service-hour-log.service-hour-log.update'
          }
        })

        const approveHourPermission = await strapi.db.query('plugin::users-permissions.permission').create({
          data: {
            action: 'api::organization.organization.approveHours'
          }
        })

        const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
          where: {
            name: 'Public',
          },
          populate: {
            permissions: true,
          },
        })

        const authenticatedRole = await strapi.db.query('plugin::users-permissions.role').findOne({
          where: {
            name: 'Authenticated',
          },
          populate: {
            permissions: true,
          },
        })
        
        // Updates Permissions
        // await strapi.db.query("plugin::users-permissions.role").updateMany({
        //   where: { 
        //     id: { $in: [publicRole.id, authenticatedRole.id ] }
        //   },
        //   data: {
        //     permissions: [
        //       ...publicRole.permissions,
        //       findSchoolPermission.id,
        //       registerPermission.id,
        //       approveAccessRequestPermission.id,
        //       getAccessRequestPermission

        //     ],
        //   },
        // });

        // await strapi.db.query("plugin::users-permissions.role").updateMany({
        //   where: { 
        //     id: { $in: [counselorRole.id, studentRole.id ] }
        //   },
        //   data: {
        //     permissions: [
        //       ...publicRole.permissions,
        //       findSchoolPermission.id,
        //       createOrUpdateProfilePermission.id,
        //       mePermission.id
        //     ],
        //   },
        // });
      }
    
      // Check if schools are available
      const seedSchools = async() => {
        const [schools, count] = await strapi.db.query('api::school.school').findWithCount({
          orderBy: { name: 'DESC' },
        });

        const [organization, orgCount] = await strapi.db.query('api::organization.organization').findWithCount({
          orderBy: { name: 'DESC' },
        });

        // Create default pgcps org
        let org;
        if (orgCount === 0) {
          org = await strapi.db.query('api::organization.organization').create({
            data: {
              name: 'pgcps',
            },
          });
        }

        // Adds schools to database
        if (count === 0) {
          org = await strapi.db.query('api::organization.organization').findOne({
            where: {
              name: 'pgcps',
            },
          });
          for (let school of allSchools) {
            await strapi.db.query('api::school.school').create({
              data: {
                name: school['School'] ? school['School'] : '',
                type: school['Type'] ? school['Type'].toLowerCase() : '',
                boeDistrict: school['BOE District'] !== "N/A" ? school['BOE District'] : 0,
                number: school['Number'] ? school['Number'] : '',
                abbreviation: school['Abbreviation'] ? school['Abbreviation'] : '',
                locationCode: school['Location Code'] ? school['Location Code'] : '',
                stateCode: school['State Code'] ? school['State Code'] : '',
                county: "pg",
                organization: org,
                address: {
                  address1: school['Address'],
                  city: school['City'],
                  zipcode: school['Zip']
                }
              },
            });
          }
        }
      }

      seedSchools()
      createRoles()
    }
  },
};
