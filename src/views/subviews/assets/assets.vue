<template>
    <div id="assets">
        <el-table :data="tableData" border>
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="table-expand">
                        <el-form-item label="设备编号">
                            <span>{{ props.row.equipmentID }}</span>
                        </el-form-item>
                        <el-form-item label="设备名称">
                            <span>{{ props.row.equipmentName }}</span>
                        </el-form-item>

                        <el-form-item label="规格型号">
                            <span>{{ props.row.equipmentModel }}</span>
                        </el-form-item>
                        <el-form-item label="设备类型">
                            <span>{{ props.row.equipmentType }}</span>
                        </el-form-item>
                        <el-form-item label="状态">
                            <span>{{ props.row.equipmentStatus }}</span>
                        </el-form-item>
                        <el-form-item label="所属系统">
                            <span>{{ props.row.system }}</span>
                        </el-form-item>
                        <el-form-item label="使用部门">
                            <span>{{ props.row.department }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="equipmentID" label="设备编号"></el-table-column>
            <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
            <el-table-column prop="equipmentModel" label="规格型号"></el-table-column>
            <el-table-column prop="equipmentType" label="设备类型"></el-table-column>
            <el-table-column prop="equipmentStatus" label="状态"></el-table-column>
            <el-table-column prop="system" label="所属系统"></el-table-column>
            <el-table-column prop="department" label="使用部门"></el-table-column>
            <el-table-column prop="area" label="安装区域"></el-table-column>
            <el-table-column prop="endpoint" label="采集点名称"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>

        <el-dialog title="设备编辑" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="设备类型" :label-width="formLabelWidth">
                    <el-select v-model="form.equipmentType" filterable placeholder="请选择">
                        <el-option v-for="item in types" :key="item.equipmentTypeName" :label="item.equipmentTypeName" :value="item.equipmentTypeName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备归属" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.isBasic">
                        <el-radio :label="1">普通设备</el-radio>
                        <el-radio :label="2">子设备</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="设备名称" :label-width="formLabelWidth">
                    <el-input v-model="form.equipmentName" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="采集点名称" :label-width="formLabelWidth">
                    <el-input v-model="form.endpoint" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="拼音简码" :label-width="formLabelWidth">
                    <el-input v-model="form.alphabet" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="所属区域" :label-width="formLabelWidth">
                    <el-select v-model="form.area" filterable placeholder="请选择">
                        <el-option v-for="item in areas" :key="item.areaName" :label="item.areaName" :value="item.areaName">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="所属系统" :label-width="formLabelWidth">
                    <el-select v-model="form.system" filterable placeholder="请选择">
                        <el-option v-for="item in systems" :key="item.systemName" :label="item.systemName" :value="item.systemName">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="所属部门" :label-width="formLabelWidth">
                    <el-select v-model="form.department" filterable placeholder="请选择">
                        <el-option v-for="item in departments" :key="item.departmentName" :label="item.departmentName" :value="item.departmentName">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-radio-group v-model="form.equipmentStatus">
                        <el-radio>正常</el-radio>
                        <el-radio>维修中</el-radio>
                        <el-radio>报废</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="使用年限（年）" :label-width="formLabelWidth">
                    <el-input-number v-model="form.serviceLife" :min="1" :max="10"></el-input-number>
                </el-form-item>

                <el-form-item label="保修期（年）" :label-width="formLabelWidth">
                    <el-input-number v-model="form.maintenancePeriodDate" :min="1" :max="10"></el-input-number>
                </el-form-item>

                <el-form-item label="购置日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.purchaseDate" type="date" placeholder="选择购置日期" :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="安装日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.installationTime" type="date" placeholder="选择安装日期" :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleEditSave">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { query } from '../../../apis/userdefined'

export default {
    name: 'Assets',

    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            tableData: [],
            total: 0,
            dialogFormVisible: false,
            formLabelWidth: '120px',
            types: [],
            areas: [],
            systems: [],
            departments: [],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7
                }
            },
            form: {
                equipmentID: '',
                equipmentName: '',
                endpoint: '',
                alphabet: '',
                equipmentTypeID: '',
                equipmentType: '',
                systemID: '',
                system: '',
                equipmentModel: '',
                equipmentStatus: '',
                purchaseDate: '',
                area: '',
                department: '',
                location: '',
                keeper: '',
                supplier: '',
                serviceLife: 1,
                maintenancePeriodDate: 1,
                installationTime: '',
                equipmentDesc: '',
                brand: '',
                manufacturer: '',
                attachment: ''
            }
        }
    },

    created() {
        this.queryAssets()
    },

    methods: {
        async handleEdit(index, row) {
            this.dialogFormVisible = true

            if (this.types.length <= 0) {
                let r = await query({
                    'query.type': '9001',
                    'query.upEquipmentTypeID': '0',
                    'method.optimize': 'includeField',
                    'method.optimize.includeField.fieldName': ['_id', 'equipmentTypeName']
                })
                this.types = r.data.object

            }

            if (this.areas.length <= 0) {
                let r = await query({
                    'query.type': '1003',
                    'method.optimize': 'includeField',
                    'method.optimize.includeField.fieldName': ['_id', 'areaName']
                })
                this.areas = r.data.object

            }

            if (this.systems.length <= 0) {
                let r = await query({
                    'query.type': '1006',
                    'method.optimize': 'includeField',
                    'method.optimize.includeField.fieldName': ['_id', 'systemName']
                })
                this.systems = r.data.object
            }

            if (this.departments.length <= 0) {
                let r = await query({
                    'query.type': '1004',
                    'method.optimize': 'includeField',
                    'method.optimize.includeField.fieldName': ['_id', 'departmentName']
                })
                this.departments = r.data.object
            }

            for(var key in this.form){
                 this.form[key] = row[key]
            }
        },

        handleDelete(index, row) {

        },

        handleEditSave() {
            this.dialogFormVisible = false
            console.log(this.form)
        },

        async queryAssets() {
            let r = await query({
                'query.type': '1001',
                'page.curPage': this.currentPage,
                'page.perPageSize': this.pageSize
            })

            let assets = r.data.object,
                pageInfo = r.data.pageInfo

            this.tableData = assets
            this.total = pageInfo.total
        },

        handleSizeChange(val) {
            this.pageSize = val
            this.queryAssets()
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.queryAssets()
        }
    }
}
</script>

<style lang="scss">
#assets {
    .table-expand {
        font-size: 0;

        label {
            width: 90px;
            color: #99a9bf;
        }

        .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
        }
    }
}
</style>



